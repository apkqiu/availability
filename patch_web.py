import requests
import concurrent.futures
f = open("found.txt", "w").close()
session = requests.Session()

def get_article(category, article):
    url = f"https://sz1cz.gusuedu.cn/info/{category}/{article}.htm"
    response = session.get(url)

    if response.status_code == 200:
        print(f"Found article: {url}")
        f.write(f"{url}\n")
    else:
        print(f"Failed to find article: {url}")

pool = concurrent.futures.ThreadPoolExecutor(max_workers=4096)
for category in range(1000,10000):
    for article in range(1000,10000):
        pool.submit(get_article, category, article)