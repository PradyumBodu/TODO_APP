from django.contrib import admin
from .models import TODO

# Register your models here.
class TodoAdmin(admin.ModelAdmin):
    list_display = ('task','user','is_complete')

admin.site.register(TODO,TodoAdmin)