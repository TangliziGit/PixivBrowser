import requests
from flask import *
import urllib

from config import config

app=Flask(__name__)

@app.route('/proxy', methods=['GET'])
def proxy():
    url=request.args.get('url')
    referer=request.args.get('referer')
    if not url or not referer:
        return '';

    headers=config['headers']
    headers['Referer']=referer
    data=requests.get(url, headers=headers)
    print(data)
    return data.content

@app.route('/rank', methods=['GET'])
def rank():
    url_args={
        'type': 'rank',
        'mode': request.args.get('mode', default='week'),
        'page': request.args.get('page', default='1'),
        'date': request.args.get('date', default=''),
    }
    url=config['API']+urllib.parse.urlencode(url_args)
    return render_template("rank.html", rankUrl=url)

@app.route('/paint', methods=['GET'])
def paint():
    url_args={
        'type': 'paint',
        'id': request.args.get('id', default=''),
    }
    url=config['API']+urllib.parse.urlencode(url_args)
    return render_template("paint.html", paintUrl=url,
            loadingPicture=url_for("static", filename=config['loading_picture']))

@app.route('/', methods=['GET'])
def index():
    return redirect('/rank')

if __name__ == '__main__':
    app.run()
