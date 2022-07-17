import requests
from twitter import *
from decouple import config

bearer_token = config("BEARER_TOKEN")

search_url = "https://api.twitter.com/2/tweets/search/recent"

def bearer_oauth(r):
    """
    Method required by bearer token authentication.
    """

    r.headers["Authorization"] = f"Bearer {bearer_token}"
    r.headers["User-Agent"] = "v2RecentSearchPython"
    return r

def connect_to_endpoint(url, params):
    response = requests.get(url, auth=bearer_oauth, params=params)
    print(response.status_code)
    if response.status_code != 200:
        raise Exception(response.status_code, response.text)
    return response.json()

def getTweets(companyName, numTweets):
    companyName = companyName.replace("and", "\\and\\")
    companyName = companyName.replace("or", "\\or\\")
    query_params = {'query': companyName, 'max_results': numTweets}
    json_response = connect_to_endpoint(search_url, query_params)
    print(json_response)
    return(json_response)

getTweets("Barnes and Noble", 10)

