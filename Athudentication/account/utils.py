from django.core.mail import EmailMessage, BadHeaderError
from smtplib import SMTPException
import os

class Util:
    @staticmethod
    def send_email(data):
        try:
            email = EmailMessage(
                subject=data['subject'],
                body=data['body'],
                from_email=os.environ.get('EMAIL_FROM'),
                to=[data['to_email']],
            )
            email.send()
            print("Email sent successfully:", email)
        except BadHeaderError as e:
            print("Invalid header found:", e)
            raise ValueError("Invalid header found.")
        except SMTPException as e:
            print(f"There was an error sending an email: {e}")
            raise ValueError(f"There was an error sending an email: {e}")
        except Exception as e:
            print(f"Unexpected error: {e}")
            raise ValueError(f"Unexpected error: {e}")
