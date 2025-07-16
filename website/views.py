

from flask import Blueprint, render_template, request, redirect, url_for, session, jsonify, current_app
from flask_mail import Message
from . import mail

views = Blueprint('views', __name__)

@views.route('/', methods=['GET', 'POST'])
def lock_screen():

    if session.get('unlocked'):
        return redirect(url_for('views.home'))

    error = None
    if request.method == 'POST':
        entered_code = request.form.get('password')

        secret_code = "06282025" 
        
        if entered_code == secret_code:
            session['unlocked'] = True
            return redirect(url_for('views.home'))
        else:

            error = "Oops! Wrong code you silly 😊, try again my love."
            
    return render_template("lock_screen.html", error=error)

@views.route('/home')
def home():
    if not session.get('unlocked'):
        return redirect(url_for('views.lock_screen'))

    return render_template("index.html")

@views.route('/love-puzzle')
def love_puzzle():
    if not session.get('unlocked'):
        return redirect(url_for('views.lock_screen'))
    return render_template("puzzle.html")

@views.route('/letters')
def letters():
    if not session.get('unlocked'):
        return redirect(url_for('views.lock_screen'))
    return render_template("letters.html")

@views.route('/music')
def music_player():
    if not session.get('unlocked'):
        return redirect(url_for('views.lock_screen'))
    return render_template("music_player.html")

@views.route('/flower-entry')
def flower_entry():
    if not session.get('unlocked'):
        return redirect(url_for('views.lock_screen'))
    return render_template("flower_entry.html")

@views.route('/flower-display')
def flower_display():
    if not session.get('unlocked'):
        return redirect(url_for('views.lock_screen'))
    return render_template("flower.html")

@views.route('/our-memories')
def our_memories():
    if not session.get('unlocked'):
        return redirect(url_for('views.lock_screen'))
    return render_template("memories.html")

@views.route('/plan-a-date')
def date_planner():
    if not session.get('unlocked'):
        return redirect(url_for('views.lock_screen'))
    return render_template("plan.html")


@views.route('/reset')
def reset_session():
    session.pop('unlocked', None)
    return redirect(url_for('views.lock_screen'))

@views.route('/send-date-plan-email', methods=['POST'])
def send_date_plan_email():
    if not session.get('unlocked'):
        return jsonify({'status': 'error', 'message': 'Not authorized'}), 401

    data = request.get_json()
    if not data or not data.get('email'):
        return jsonify({'status': 'error', 'message': 'Missing email address'}), 400

    recipient_email = data.get('email')
    # Get the sender's own email from the app configuration
    sender_email = current_app.config['MAIL_DEFAULT_SENDER'][1]

    # Create a list of recipients, starting with the email from the form
    recipients_list = [recipient_email]

    # Add the sender's email to the list if it's different, to avoid duplicates
    if recipient_email.lower().strip() != sender_email.lower().strip():
        recipients_list.append(sender_email)
    
    try:
        html_body = render_template('date_plan_email.html', plan=data)

        msg = Message(
            subject=f"Our Next Adventure: {data.get('name', 'Date Plan')}!",
            recipients=recipients_list, # Use the list of both emails here
            html=html_body
        )
        
        mail.send(msg)
        
        return jsonify({'status': 'success', 'message': 'Date plan confirmation sent to both of us!'})

    except Exception as e:
        print(f"Error sending email: {e}") # For debugging on the server
        return jsonify({'status': 'error', 'message': 'Failed to send email.'}), 500