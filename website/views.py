from flask import Blueprint, render_template, request, redirect, url_for, session

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


@views.route('/reset')
def reset_session():
    session.pop('unlocked', None)
    return redirect(url_for('views.lock_screen'))