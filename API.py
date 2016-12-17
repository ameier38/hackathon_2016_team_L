from flask import Flask, jsonify, request, render_template
from bs4 import BeautifulSoup as soup
import requests
import os


app = Flask(__name__)

def scrape( data ):
    
    results = [  ]
    
    url = 'https://www.google.com/search?q=I+want+to' +  data
    # image_url = 'https://www.google.com/search?q=i+want+to+'+  +'&source=lnms&tbm=isch&sa=X&ved=0ahUKEwie9Zay9fvQAhUk_IMKHW0IBdgQ_AUICygE&biw=1122&bih=691'
    
    webpage = requests.get( url )
    scrape_url = soup( webpage.content )
    
    count = 0
    
    for i in scrape_url.find_all('h3', { 'class': 'r' }):
        for a in i:
            
            count += 1
            
            if count <= 4:
                results.append( { 'link': a.get('href')[7:] } )
            
    return results

@app.route('/')
def home():
    
    return render_template('index.html')

@app.route('/GETdata')
def send():
    
    data = request.args.get('d')
    
    if len( data ) == 0:
        return jsonify({ 'error_message': 'No results found.', 'len': 0, 'status': None })
        
    return jsonify({ 'results': scrape( data ), 'len': 0, 'status': True })


app.run(host=os.getenv('IP', '0.0.0.0'), port=3000, debug=True)