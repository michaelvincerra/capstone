from django.db import models

# Create your models here.


class EconomicSnapshot(models.Model):

    INDICATORS = (
        ('IP', 'Intellectual Property Sales'),
        ('GNI', 'Gross National Income'),
        ('GDP', 'Gross Domestic Product'),
    )


    name = models.CharField(max_length=50)
    type = models.CharField(max_length=100, choices=INDICATORS)
    created = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.name
