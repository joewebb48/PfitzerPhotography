



from django.forms import ClearableFileInput



class ImageWidget( ClearableFileInput ):
	input_text = 'Update'
	template_name = 'widget.html'
	
	def __init__( self ):
		## All image widgets use the same class
		attrs = { 'class': 'upload-image' }
		super( ).__init__( attrs )
	
	def get_context( self, name, value, attrs ):
		context = super( ).get_context( name, value, attrs )
		context[ 'widget' ].update( )
		return context
	
	
	class Media:
		css = { 'all': [ 'admin.css' ] }


