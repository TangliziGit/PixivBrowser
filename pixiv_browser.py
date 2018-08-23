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
    return render_template("rank.html",
            rankAPI=url,
            pageInfo=url_args)

@app.route('/illust', methods=['GET'])
def illust():
    url_args={
        'type': 'illust',
        'id': request.args.get('id', default=''),
    }
    illust_url=config['API']+urllib.parse.urlencode(url_args)
    url_args={
        'type': 'related',
        'page': request.args.get('page', default='1'),
        'id': request.args.get('id', default=''),
    }
    related_url=config['API']+urllib.parse.urlencode(url_args)
    return render_template("illust.html",
            illustUrl=illust_url,
            relatedUrl=related_url,
            pageInfo=url_args,
            loadingPicture=url_for("static", filename=config['loading_picture']))

@app.route('/member', methods=['GET'])
def member():
    url_args={
        'type': 'member',
        'id': request.args.get('id', default=''),
    }
    member_url=config['API']+urllib.parse.urlencode(url_args)

    url_args={
        'type': 'member_illust',
        'page': request.args.get('page', default='1'),
        'id': request.args.get('id', default=''),
    }
    member_illust_url=config['API']+urllib.parse.urlencode(url_args)
    return render_template("member.html",
            memberUrl=member_url,
            memberIllustUrl=member_illust_url,
            pageInfo=url_args,
            loadingPicture=url_for("static", filename=config['loading_picture']))

@app.route('/', methods=['GET'])
def index():
    return redirect('/rank')

if __name__ == '__main__':
    app.run()
