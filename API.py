from flask import Flask, jsonify, request
from bs4 import BeautifulSoup as soup
import requests
import os


app = Flask(__name__)


def scrape( data ):
    
    results = [  ]
    
    url = 'https://www.google.com/search?q=I+want+to' +  data
    
    webpage = requests.get( url )
    scrape_url = soup( webpage.content )
    
    count = 0
    
    for i in scrape_url.find_all('h3', { 'class': 'r' }):
        for a in i:
            
            count += 1
            
            if count <= 4:
                results.append( { 'link': a.get('href')[7:] } )
            
    return results


@app.route('/send_data')
def send():
    
    data = request.args.get('d')
    
    if len( data ) == 0:
        return jsonify({ 'error_message': 'No results found.', 'len': 0, 'status': None })
    
    return jsonify({ 'resluts': scrape( data ), 'len': 0, 'status': True })


app.run(host=os.getenv('IP', 'localhost'), port=int(os.getenv('PORT', 8080)),debug=True)