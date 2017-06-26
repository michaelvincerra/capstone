from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm, PasswordChangeForm, PasswordResetForm
from .models import User



class CustomUserCreationForm(UserCreationForm):
    nickname = forms.RegexField(label=("Nickname"), max_length=250,
                                regex=r'^[\w+\-\s]+$',
                                )  # +$ is for more than one character; customize as needed.


    class Meta(UserCreationForm):
        model = User
        fields = UserCreationForm.Meta.fields + ('nickname','email',)


# class CustomeUserChangeForm(UserChangeForm):
#     class Meta(UserChangeForm):
#         model = User
#         fields = UserChangeForm.Meta.fields + ('nickname',)

class CustomUserUpdateForm(forms.ModelForm):

    class Meta:
        model = User
        fields = ('username', 'nickname', 'first_name', 'last_name',)