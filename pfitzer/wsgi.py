"""
	WSGI config for PfitzerPhotography project.
	
	It exposes the WSGI callable as a module-level variable named ``application``.
	
	For more information on this file, see:
		https://docs.djangoproject.com/en/2.1/howto/deployment/wsgi/
"""



import os

from pfitzer.app import get_meta_application



os.environ.setdefault( 'DJANGO_SETTINGS_MODULE', 'pfitzer.settings' )


application = get_meta_application( )


