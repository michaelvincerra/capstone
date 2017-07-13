"""
https://simpleisbetterthancomplex.com/tutorial/2017/02/18/how-to-create-user-sign-up-view.html
"""

from .forms import CustomUserCreationForm
from .forms import CustomUserUpdateForm
from django.contrib.auth import authenticate
from django.shortcuts import render, redirect
from django.contrib.auth import login as django_login
from django.contrib.auth import logout as django_logout
from django.contrib.auth.forms import AuthenticationForm, PasswordChangeForm
from django.core.mail import send_mail
from django.contrib import messages
from django.contrib.auth.decorators import login_required

#Django email: https://docs.djangoproject.com/en/1.11/topics/email/#quick-example

def login(request):
    if request.method == 'GET':
        form = AuthenticationForm()

    elif request.method == 'POST':
        form = AuthenticationForm(data=request.POST)

        if form.is_valid():
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=raw_password)
            django_login(request, user)
            return redirect('/')  # TODO: Success redirect to a better page.

    context = {'form': form}
    return render(request, 'accounts/login.html', context)


def logout(request):
    django_logout(request)
    return redirect('/')


def register(request):

    if request.method == "GET":
        form = CustomUserCreationForm()

    elif request.method == 'POST':
        form = CustomUserCreationForm(data=request.POST)
        if form.is_valid():
             # We can make any last second changes.
            user = form.save(commit=False)

            send_mail(
                subject = 'First test',
                message = 'Steve is a rockstar!.',
                from_email ='michael.vincerra@gmail.com',
                recipient_list=[user.email],
                fail_silently=False,
            )

            # make any final changes to the user here.
            # TODO: Ad a mail_managers function here. Per doc below:
            # https://docs.djangoproject.com/en/1.11/topics/email/#mail-managers
            user.save()

            messages.add_message(request, messages.SUCCESS, 'Account created. Welcome to DataPanino.')


            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            django_login(request, user)

            return redirect('/')   # TODO: Find a better redirect

    context = {'form': form}
    return render(request, 'accounts/register.html', context)





@login_required(login_url='/accounts/login/')
def profile(request):
    password_form = PasswordChangeForm(user=request.user)
    form = CustomUserUpdateForm(instance=request.user)

    context = {'form': form, 'password_form': password_form}
    return render(request, 'profile.html', context)

