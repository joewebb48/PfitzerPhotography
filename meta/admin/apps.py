



from django.contrib.admin.apps import AdminConfig



class AdminConfig( AdminConfig ):
	default_site = 'meta.admin.admin.site'



admin = AdminConfig



