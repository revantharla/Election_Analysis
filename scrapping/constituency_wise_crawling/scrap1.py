import requests
from bs4 import BeautifulSoup
import csv

dict = {"Abhanpur": "53", "Ahiwara": "67", "Akaltara": "33", "Arang": "52", "Basna": "40", "Bastar": "85",
        "Beltara": "31", "Bijapur": "89", "Bilha": "29", "Durg City": "64", "AGAR": "166", "ALOTE": "223",
        "AMLA": "130", "ASHTA": "157", "ATER": "9", "BAGLI": "174", "BAIHAR": "108", "BANDA": "42", "BARGI": "96",
        "BETUL": "131", "Aizawl North-i": "10", "Aizawl North-ii": "11", "Aizawl North-iii": "12",
        "Aizawl East-i": "13", "Aizawl East-ii": "14", "Aizawl South-i": "18", "Aizawl South-ii": "19",
        "Aizawl South-iii": "20", "Aizawl West-i": "15", "Aizawl West-ii": "16", "Aizawl West-iii": "17",
        "Ahore": "141", "Amber": "47", "Anta": "193", "Asind": "177", "Bali": "120", "Bagru": "56", "Bansur": "63",
        "Bari": "78", "Bassi": "57", "Bhim": "173", "Alair": "97", "Armur": "11", "Boath": "8", "Chennur": "2",
        "Chevella": "53", "Dubbak": "41", "Gadwal": "79", "Jagtial": "21", "Jukkal": "13", "Mulug": "109"}

code = ["53", "67", "33", "52","40","85","31","89","29","64"]
name=list(dict.keys())
key_list = list(dict.keys())
val_list = list(dict.values())

print()

with open("data/Chattisgarh/Chattisgarh.csv", 'w') as f:
    for i in code:
        n=str(i)
        lr=key_list[val_list.index(n)]
        print(lr)
        page = requests.get("http://eciresults.nic.in/ConstituencywiseS26" + i + ".htm?ac=" + i)
        soup = BeautifulSoup(page.content, 'html.parser');
        table = soup.find('table', border="1");
        t_rows = table.find_all('tr', style="font-size:12px;");
        for row in t_rows:
            result = row.findAll('td');
            print(result[0].text)
            data_writer = csv.writer(f, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL);
            data_writer.writerow(['%s' % (result[0].text.strip()), '%s' % (lr.strip()), '%s' % (result[1].text.strip()),
                                  '%s' % (result[2].text.strip())]);


