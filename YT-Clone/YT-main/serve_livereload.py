from livereload import Server
import os
import threading
import time
import webbrowser

root = os.path.dirname(os.path.abspath(__file__))
server = Server()

# Watch common static file locations
server.watch(os.path.join(root, '*.html'))
server.watch(os.path.join(root, 'styles', '*.css'))
server.watch(os.path.join(root, '*.css'))
server.watch(os.path.join(root, 'thumbnails', '*'))
server.watch(os.path.join(root, 'channel-pictures', '*'))

# Try a few ports (in case one is busy) and open youtube.html automatically
ports = [5510, 5511, 5512]

def _open_after_delay(port):
	time.sleep(1)
	webbrowser.open(f'http://localhost:{port}/youtube.html')

for port in ports:
	try:
		threading.Thread(target=_open_after_delay, args=(port,), daemon=True).start()
		server.serve(root=root, port=port)
		break
	except OSError:
		continue
