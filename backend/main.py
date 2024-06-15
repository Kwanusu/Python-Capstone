from flask import Flask, redirect, request, jsonify, session
from flask_jwt_extended import create_access_token
from config import app, db, mail
from models import Contact, User
from flask_mail import Message
import logging
from sqlalchemy.orm import scoped_session, sessionmaker
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_jwt_extended import JWTManager

# Initialize JWTManager
jwt = JWTManager(app)

logging.basicConfig(level=logging.DEBUG)

# Endpoint to retrieve all contacts
@app.route("/contacts", methods=["GET"])
def get_contacts():
    session = Session()
    contacts = session.query(Contact).all()
    json_contacts = [contact.to_json() for contact in contacts]
    return jsonify({"contacts": json_contacts})

# Endpoint to create a new contact
@app.route("/create_contact", methods=["POST"])
def create_contact():
    data = request.get_json()

    logging.debug("Received data: %s", data)

    required_fields = ["firstName", "lastName", "email", "user_id"]
    
    if not all(field in data for field in required_fields):
        return jsonify({"message": "Missing required fields: firstName, lastName, email, role, task, user_id"}), 400

    new_contact = Contact(
        first_name=data["firstName"],
        last_name=data["lastName"],
        email=data["email"],
        role=data.get("role"),
        task=data.get("task"),
        user_id=data["user_id"]
    )

    session = Session()
    try:
        session.add(new_contact)
        session.commit()
        return jsonify({"message": "Contact created successfully!"}), 201
    except Exception as e:
        session.rollback()
        logging.error("Error creating contact: %s", str(e))
        return jsonify({"message": str(e)}), 400

# Endpoint to update an existing contact
@app.route("/update_contact/<int:id>", methods=["PATCH"])
def update_contact(id):
    session = Session()
    contact = session.get(Contact, id)
    if not contact:
        return jsonify({"message": "Contact not found"}), 404
    
    data = request.get_json()
    logging.debug("Update data: %s", data)

    contact.first_name = data.get("firstName", contact.first_name)
    contact.last_name = data.get("lastName", contact.last_name)
    contact.email = data.get("email", contact.email)
    contact.role = data.get("role", contact.role)
    contact.task = data.get("task", contact.task)
    
    try:
        session.commit()
        return jsonify({"message": "Contact updated successfully"}), 200
    except Exception as e:
        session.rollback()
        logging.error("Error updating contact: %s", str(e))
        return jsonify({"message": str(e)}), 400

# Endpoint to delete an existing contact
@app.route("/delete_contact/<int:id>", methods=["DELETE"])
def delete_contact(id):
    session = Session()
    contact = session.get(Contact, id)
    if not contact:
        return jsonify({"message": "Contact not found"}), 404
    
    try:
        session.delete(contact)
        session.commit()
        return jsonify({"message": "Contact deleted successfully"}), 200
    except Exception as e:
        session.rollback()
        logging.error("Error deleting contact: %s", str(e))
        return jsonify({"message": str(e)}), 400

# Endpoint to assign role and task to a contact
@app.route('/assign_role_task/<int:id>', methods=['PATCH'])
def assign_role_task(id):
    data = request.get_json()
    session = Session()
    contact = session.get(Contact, id)
    if not contact:
        return jsonify({"message": "Contact not found"}), 404

    contact.role = data.get('role', contact.role)
    contact.task = data.get('task', contact.task)
    
    try:
        session.commit()
        send_memo(contact.email, contact.role, contact.task)
        return jsonify({"message": "Role and task assigned successfully"}), 200
    except Exception as e:
        session.rollback()
        logging.error("Error assigning role and task: %s", str(e))
        return jsonify({"message": str(e)}), 400

# Function to send memo
def send_memo(email, role, task):
    msg = Message('New Role and Task Assignment',
                  sender='admin@example.com',
                  recipients=[email])
    msg.body = f'You have been assigned a new role: {role}\nYour task: {task}'
    mail.send(msg)

# Login endpoint
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    logging.debug("Login data received: %s", data)

    username = data.get('username')
    password = data.get('password')
    session = Session()
    user = session.query(User).filter_by(username=username).first()

    if user:
        logging.debug("User found: %s", user.username)
        
        if not user.password_hash:
            logging.debug("Password not set for user: %s", user.username)
            return jsonify({"message": "Password not set", "user_id": user.id}), 200
        
        if user.check_password(password):
            logging.debug("Password matched for user: %s", user.username)
            access_token = create_access_token(identity=user.id)
            return jsonify(access_token=access_token), 200
        else:
            logging.debug("Password mismatch for user: %s", user.username)
    else:
        logging.debug("User not found: %s", username)

    return jsonify({"message": "Bad username or password"}), 401

@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")

@app.route('/set_password', methods=['POST'])
def set_password():
    data = request.get_json()
    logging.debug("Set password data received: %s", data)

    user_id = data.get('user_id')
    password = data.get('password')
    session = Session()
    user = session.get(User, user_id)

    if user and not user.password_hash:
        user.set_password(password)
        try:
            session.commit()
            logging.debug("Password set successfully for user: %s", user.username)
            access_token = create_access_token(identity=user.id)
            return jsonify(access_token=access_token), 200
        except Exception as e:
            session.rollback()
            logging.error("Error setting password: %s", str(e))
            return jsonify({"message": str(e)}), 400
    else:
        logging.debug("User not found or password already set for user_id: %s", user_id)

    return jsonify({"message": "User not found or password already set"}), 400

# Endpoint to retrieve contacts of the logged-in user
@app.route('/user_contacts', methods=['GET'])
def get_user_contacts():
    current_user_id = request.args.get('user_id')
    session = Session()
    contacts = session.query(Contact).filter_by(user_id=current_user_id).all()
    return jsonify({"contacts": [contact.to_json() for contact in contacts]})

# Endpoint for accessing the admin panel
@app.route("/admin_panel", methods=["GET"])
def admin_panel():
    current_user_id = request.args.get('user_id')
    session = Session()
    user = session.get(User, current_user_id)
    if user and user.is_admin:
        return jsonify({
            "user_id": user.id,
            "username": user.username,
            "message": "Welcome to the admin panel!"
        }), 200
    return jsonify({"message": "User not authorized to access the admin panel"}), 403
# Endpoint to send emails to all contacts
@app.route('/send_emails_to_all_contacts', methods=['POST'])
@jwt_required()  # Ensure the user is authenticated
def send_emails_to_all_contacts():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if not user or not user.is_admin:
        return jsonify({"message": "User not authorized to send emails"}), 403

    # Fetch all contacts from the database
    contacts = Contact.query.all()
    email_list = [contact.email for contact in contacts]

    # Email content from request data
    data = request.get_json()
    subject = data.get("subject", "No Subject")
    body = data.get("body", "No Content")

    # Send email to each contact
    try:
        for email in email_list:
            send_email(email, subject, body)
        return jsonify({"message": "Emails sent successfully!"}), 200
    except Exception as e:
        logging.error("Error sending emails: %s", str(e))
        return jsonify({"message": "Error sending emails", "error": str(e)}), 500

# Function to send email
def send_email(recipient, subject, body):
    msg = Message(subject, sender='admin@example.com', recipients=[recipient])
    msg.body = body
    mail.send(msg)

# Create database tables and run the app
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        session_factory = sessionmaker(bind=db.engine)
        Session = scoped_session(session_factory)
    app.run(debug=True)

@app.teardown_appcontext
def remove_session(exception=None):
    Session.remove()

