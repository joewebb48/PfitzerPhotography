



import os
import sys
import signal
from multiprocessing import Process, Queue
from subprocess import Popen, PIPE, STDOUT
from collections import namedtuple



class Node( object ):
	queue = Queue( )
	environ = os.environ.copy( )
	## Governs the created Node server process internals
	nodejs = Process( name = 'nodejs', args = ( queue, True ) )
	iostruct = namedtuple( 'Message', 'type data' )
	logger = sys.stdout
	term = None
	
	def __init__( self ):
		self.nodejs.target = self.run
		## Hand the unique process port off to Node server
		port = int( os.getenv( 'PORT' ) ) + 1 if os.getenv( 'PORT' ) else 3000
		self.environ.update( { 'PORT': str( port ) } )
		## Initialize Node with the updated environment info
		kwargs = { 'env': self.environ, 'shell': True, 'stderr': STDOUT, 'stdout': PIPE }
		self.server = Popen( 'node node/node.js', **kwargs )
	
	def run( self, watch, ignore = False ):
		self.queue = watch
		## Only terminate when shutting down whole app
		if ignore:
			signal.signal( signal.SIGINT, signal.SIG_IGN )
			signal.signal( signal.SIGTERM, signal.SIG_IGN )
		## Meant for streaming output feedback but doesn't
		for line in iter( self.server.stdout.readline, b'' ):
			if self.queue:
				self.queue.put( self.iostruct( type = 'line', data = line ) )
		self.server.stdout.close( )
		self.server.wait( )
	
	def start( self ):
		signal.signal( signal.SIGTERM, self.finish )
		signal.signal( signal.SIGINT, self.finish )
		self.nodejs.start( )
		end = False
		while not end:
			## Not yet able to log output messages properly
			try:
				pipe = self.queue.get( timeout = 0.1 )
			except Empty:
				if end:
					break
			else:
				self.write( pipe )
			## Kill prerendering server when app terminates
			if self.server.pid and self.server.returncode:
				end = True
				self.kill( force = True )
		## Finalize Node server system process termination
		sys.exit( self.term )
	
	def write( self, text ):
		## Supposed to log process output but not working
		echo = text.data
		for line in echo.splitlines( ):
			self.logger.write( line + '\n' )
	
	def finish( self, num, arg ):
		terminate = 143
		interrupt = 130
		self.term = num
		self.kill( )
	
	def kill( self, force = False ):
		warn = signal.SIGKILL if force else signal.SIGTERM
		try:
			os.killpg( self.server.pid, warn )
		except OSError as error:
			if error.errno not in [ errno.EPERM, errno.ESRCH ]:
				raise



get_node_application = Node



