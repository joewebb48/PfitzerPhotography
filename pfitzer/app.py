



from django.core.wsgi import get_wsgi_application

from pfitzer.node import get_node_application



def get_meta_application( ):
	return get_wsgi_application( ), get_node_application( )



