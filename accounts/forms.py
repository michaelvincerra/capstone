from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import User



class CustomUserCreationForm(UserCreationForm):
    nickname = forms.RegexField(label=("Nickname"), max_length=250,
                                regex=r'^[\w+\-\s]+$',
                                )  # +$ is for more than one character; customize as needed.


    class Meta(UserCreationForm):
        model = User
        fields = UserCreationForm.Meta.fields + ('nickname','email',)

#
# class CustomeUserChangeForm(UserChangeForm):
#     class Meta(UserChangeForm):
#         model = User
#         fields = UserChangeForm.Meta.fields + ('nickname',)