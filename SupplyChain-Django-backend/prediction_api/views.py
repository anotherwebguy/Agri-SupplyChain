from django.shortcuts import render
from . import models
import pandas as pd
from . import crops
from datetime import datetime
from sklearn.tree import DecisionTreeRegressor
import numpy as np
from rest_framework.response import Response
from rest_framework.views import APIView
from . models import *
from . serializer import *

# Create your views here.
class Crop:

    def __init__(self, filename):
        self.name = filename
        dataset = pd.read_csv(filename)
        self.X = dataset.iloc[:, :-1].values
        self.Y = dataset.iloc[:, 3].values
        print(self.X)
        print(self.X.shape)
        #Fitting the data in DecisionTreeRegressor
        self.regressor = DecisionTreeRegressor(max_depth=10, random_state=0)
        self.regressor.fit(self.X, self.Y)


    # function to get predictions using the DecisionTreeRegressor
    def getPredictedValue(self, value):
        if value[1]>=2022:
            checkdata = np.array(value).reshape(1,3)
            return self.regressor.predict(checkdata)[0]
        else:
            c = self.X[:,0:2]
            x = []
            for i in c:
                x.append(i.tolist())
            checkdata = [value[0], value[1]]
            ind = 0
            for i in range(0,len(x)):
                if x[i]==checkdata:
                    ind=i
                    break 
            return self.Y[ind]     

    # function to get Crop Names
    def getCropName(self):
        val = self.name.split('.')
        cropName = val[0].split('/')[2]
        return cropName  

#-----------------------------------------------------------#

# dictionary of all the data files location
crops_dict = {
    "arhar": "media/csvfiles/Arhar.csv",
    "bajra": "media/csvfiles/Bajra.csv",
    "barley": "media/csvfiles/Barley.csv",
    "copra": "media/csvfiles/Copra.csv",
    "cotton": "media/csvfiles/Cotton.csv",
    "sesamum": "media/csvfiles/Sesamum.csv",
    "gram": "media/csvfiles/Gram.csv",
    "groundnut": "media/csvfiles/Groundnut.csv",
    "jowar": "media/csvfiles/Jowar.csv",
    "maize": "media/csvfiles/Maize.csv",
    "masoor": "media/csvfiles/Masoor.csv",
    "moong": "media/csvfiles/Moong.csv",
    "niger": "media/csvfiles/Niger.csv",
    "paddy": "media/csvfiles/Paddy.csv",
    "ragi": "media/csvfiles/Ragi.csv",
    "rape": "media/csvfiles/Rape.csv",
    "jute": "media/csvfiles/Jute.csv",
    "safflower": "media/csvfiles/Safflower.csv",
    "soyabean": "media/csvfiles/Soyabean.csv",
    "sugarcane": "media/csvfiles/Sugarcane.csv",
    "sunflower": "media/csvfiles/Sunflower.csv",
    "urad": "media/csvfiles/Urad.csv",
    "wheat": "media/csvfiles/Wheat.csv"
}

annual_rainfall = [29, 21, 37.5, 30.7, 52.6, 150, 299, 251.7, 179.2, 70.5, 39.8, 10.9]

base = {
    "Paddy": 1245.5,
    "Arhar": 3200,
    "Bajra": 1175,
    "Barley": 980,
    "Copra": 5100,
    "Cotton": 3600,
    "Sesamum": 4200,
    "Gram": 2800,
    "Groundnut": 3700,
    "Jowar": 1520,
    "Maize": 1175,
    "Masoor": 2800,
    "Moong": 3500,
    "Niger": 3500,
    "Ragi": 1500,
    "Rape": 2500,
    "Jute": 1675,
    "Safflower": 2500,
    "Soyabean": 2200,
    "Sugarcane": 2250,
    "Sunflower": 3700,
    "Urad": 4300,
    "Wheat": 1350
}

# base = {
#     "Paddy": 2624.5,
#     "Arhar": 10320.51,
#     "Bajra": 2451.21,
#     "Barley": 2635.53,
#     "Copra": 13358.58,
#     "Cotton": 8630,
#     "Sesamum": 13582.08,
#     "Gram": 6564.92,
#     "Groundnut": 5178.19,
#     "Jowar": 3140.31,
#     "Maize": 2163.09,
#     "Masoor": 7709.71,
#     "Moong": 10228.02,
#     "Niger": 6533.55,
#     "Ragi": 2882.04,
#     "Rape": 6972.18,
#     "Jute": 5679.52,
#     "Safflower": 5200.36,
#     "Soyabean": 4751.67,
#     "Sugarcane": 400,
#     "Sunflower": 5287.18,
#     "Urad": 10659.73,
#     "Wheat": 2479.39
# }


crops_list = []
arhar = Crop(crops_dict["arhar"])
crops_list.append(arhar)
bajra = Crop(crops_dict["bajra"])
crops_list.append(bajra)
barley = Crop(crops_dict["barley"])
crops_list.append(barley)
copra = Crop(crops_dict["copra"])
crops_list.append(copra)
cotton = Crop(crops_dict["cotton"])
crops_list.append(cotton)
sesamum = Crop(crops_dict["sesamum"])
crops_list.append(sesamum)
gram = Crop(crops_dict["gram"])
crops_list.append(gram)
groundnut = Crop(crops_dict["groundnut"])
crops_list.append(groundnut)
jowar = Crop(crops_dict["jowar"])
crops_list.append(jowar)
maize = Crop(crops_dict["maize"])
crops_list.append(maize)
masoor = Crop(crops_dict["masoor"])
crops_list.append(masoor)
moong = Crop(crops_dict["moong"])
crops_list.append(moong)
niger = Crop(crops_dict["niger"])
crops_list.append(niger)
paddy = Crop(crops_dict["paddy"])
crops_list.append(paddy)
ragi = Crop(crops_dict["ragi"])
crops_list.append(ragi)
rape = Crop(crops_dict["rape"])
crops_list.append(rape)
jute = Crop(crops_dict["jute"])
crops_list.append(jute)
safflower = Crop(crops_dict["safflower"])
crops_list.append(safflower)
soyabean = Crop(crops_dict["soyabean"])
crops_list.append(soyabean)
sugarcane = Crop(crops_dict["sugarcane"])
crops_list.append(sugarcane)
sunflower = Crop(crops_dict["sunflower"])
crops_list.append(sunflower)
urad = Crop(crops_dict["urad"])
crops_list.append(urad)
wheat = Crop(crops_dict["wheat"])
crops_list.append(wheat)
print(crops_list)


def TopFiveWinners():
    current_month = datetime.now().month
    current_year = datetime.now().year
    current_rainfall = annual_rainfall[current_month - 1]
    prev_month = current_month - 1
    prev_rainfall = annual_rainfall[prev_month-1]
    current_month_prediction = []
    prev_month_prediction = []
    change = []

    for i in crops_list:
        current_predict = i.getPredictedValue([float(current_month), current_year, current_rainfall])
        current_month_prediction.append(current_predict)
        prev_predict = i.getPredictedValue([float(prev_month), current_year, prev_rainfall])
        prev_month_prediction.append(prev_predict)
        change.append((((current_predict - prev_predict) * 100 / prev_predict), crops_list.index(i)))
    sorted_change = change
    sorted_change.sort(reverse=True)
    to_send = []
    for j in range(0, 5):
        perc, i = sorted_change[j]
        name = crops_list[i].getCropName()
        print('first')
        print(name)
        to_send.append([name, round(((current_month_prediction[i]) * base[name]) / 100, 2), round(perc, 2)])
    print(to_send)
    return to_send


def TopFiveLosers():
    current_month = datetime.now().month
    current_year = datetime.now().year
    current_rainfall = annual_rainfall[current_month - 1]
    prev_month = current_month - 1
    prev_rainfall = annual_rainfall[prev_month-1]
    current_month_prediction = []
    prev_month_prediction = []
    change = []

    for i in crops_list:
        current_predict = i.getPredictedValue([float(current_month), current_year, current_rainfall])
        current_month_prediction.append(current_predict)
        prev_predict = i.getPredictedValue([float(prev_month), current_year, prev_rainfall])
        prev_month_prediction.append(prev_predict)
        change.append((((current_predict - prev_predict) * 100 / prev_predict), crops_list.index(i)))
    sorted_change = change
    sorted_change.sort()
    to_send = []
    for j in range(0, 5):
        perc, i = sorted_change[j]
        name = crops_list[i].getCropName()
        print('first')
        print(name)
        to_send.append([name, round(((current_month_prediction[i]) * base[name]) / 100, 2), round(perc, 2)])
    print(to_send)
    # to_send.pop(0)
    return to_send    


def SixMonthsForecastHelper(name):
    current_month = datetime.now().month
    current_year = datetime.now().year
    current_rainfall = annual_rainfall[current_month - 1]
    
    print("hi")
    print(name)
    print('-----------------')
    name = name.lower()
    commodity = crops_list[0]
    for i in crops_list:
        if name == str(i):
            commodity = i
            break
    month_with_year = []
    for i in range(1, 7):
        if current_month + i <= 12:
            month_with_year.append((current_month + i, current_year, annual_rainfall[current_month + i - 1]))
        else:
            month_with_year.append((current_month + i - 12, current_year + 1, annual_rainfall[current_month + i - 13]))
    wpis = []
    current_wpi = commodity.getPredictedValue([float(current_month), current_year, current_rainfall])
    change = []

    for m, y, r in month_with_year:
        current_predict = commodity.getPredictedValue([float(m), y, r])
        wpis.append(current_predict)
        change.append(((current_predict - current_wpi) * 100) / current_wpi)

    crop_price = []
    for i in range(0, len(wpis)):
        m, y, r = month_with_year[i]
        x = datetime(y, m, 1)
        x = x.strftime("%b %y")
        crop_price.append([x, round(((wpis[i])* base[name.capitalize()]) / 100, 2) , round(change[i], 2)])
    
    return crop_price


def SixMonthsForecast():
    month1=[]
    month2=[]
    month3=[]
    month4=[]
    month5=[]
    month6=[]
    for i in crops_list:
        crop=SixMonthsForecastHelper(i.getCropName())
        k=0
        for j in crop:
            time = j[0]
            price = j[1]
            change = j[2]
            if k==0:
                month1.append((price,change,i.getCropName(),time))
            elif k==1:
                month2.append((price,change,i.getCropName(),time))
            elif k==2:
                month3.append((price,change,i.getCropName(),time))
            elif k==3:
                month4.append((price,change,i.getCropName(),time))
            elif k==4:
                month5.append((price,change,i.getCropName(),time))
            elif k==5:
                month6.append((price,change,i.getCropName(),time))
            k+=1
    month1.sort()
    month2.sort()
    month3.sort()
    month4.sort()
    month5.sort()
    month6.sort()
    crop_month_wise=[]
    crop_month_wise.append([month1[0][3],month1[len(month1)-1][2],month1[len(month1)-1][0],month1[len(month1)-1][1],month1[0][2],month1[0][0],month1[0][1]])
    crop_month_wise.append([month2[0][3],month2[len(month2)-1][2],month2[len(month2)-1][0],month2[len(month2)-1][1],month2[0][2],month2[0][0],month2[0][1]])
    crop_month_wise.append([month3[0][3],month3[len(month3)-1][2],month3[len(month3)-1][0],month3[len(month3)-1][1],month3[0][2],month3[0][0],month3[0][1]])
    crop_month_wise.append([month4[0][3],month4[len(month4)-1][2],month4[len(month4)-1][0],month4[len(month4)-1][1],month4[0][2],month4[0][0],month4[0][1]])
    crop_month_wise.append([month5[0][3],month5[len(month5)-1][2],month5[len(month5)-1][0],month5[len(month5)-1][1],month5[0][2],month5[0][0],month5[0][1]])
    crop_month_wise.append([month6[0][3],month6[len(month6)-1][2],month6[len(month6)-1][0],month6[len(month6)-1][1],month6[0][2],month6[0][0],month6[0][1]])
    print("Crops month wise predictions ")    
    print(crop_month_wise)
    return crop_month_wise


def CurrentMonth(name):
    current_month = datetime.now().month
    current_year = datetime.now().year
    current_rainfall = annual_rainfall[current_month - 1]
    name = name.lower()
    commodity = crops_list[0]
    for i in crops_list:
        if name == str(i):
            commodity = i
            break
    current_wpi = commodity.getPredictedValue([float(current_month), current_year, current_rainfall])
    current_price = (base[name.capitalize()]*(current_wpi))/100
    return current_price


def TwelveMonthsForecast(name):
    current_month = datetime.now().month
    current_year = datetime.now().year
    current_rainfall = annual_rainfall[current_month - 1]
    name = name.lower()
    print(name)
    commodity = crops_list[0]
    for i in crops_list:
        x = i.getCropName()
        if name == x.lower():
            commodity = i
            break
    month_with_year = []
    for i in range(1, 13):
        if current_month + i <= 12:
            month_with_year.append((current_month + i, current_year, annual_rainfall[current_month + i - 1]))
        else:
            month_with_year.append((current_month + i - 12, current_year + 1, annual_rainfall[current_month + i - 13]))
    max_index = 0
    min_index = 0
    max_value = 0
    min_value = 9999
    wpis = []
    current_wpi = commodity.getPredictedValue([float(current_month), current_year, current_rainfall])
    change = []

    for m, y, r in month_with_year:
        current_predict = commodity.getPredictedValue([float(m), y, r])
        previous_predict = commodity.getPredictedValue([float(m-1), y, r-1])
        if current_predict > max_value:
            max_value = current_predict
            max_index = month_with_year.index((m, y, r))
        if current_predict < min_value:
            min_value = current_predict
            min_index = month_with_year.index((m, y, r))
        wpis.append(current_predict)
        change.append(((current_predict - previous_predict) * 100) / previous_predict)

    max_month, max_year, r1 = month_with_year[max_index]
    min_month, min_year, r2 = month_with_year[min_index]
    min_value = (min_value) * base[name.capitalize()] / 100
    max_value = (max_value) * base[name.capitalize()] / 100
    crop_price = []
    for i in range(0, len(wpis)):
        m, y, r = month_with_year[i]
        x = datetime(y, m, 1)
        x = x.strftime("%b %y")
        crop_price.append([x, round(((wpis[i])* base[name.capitalize()]) / 100, 2) , round(change[i], 2)])
    print("forecast", change)
    x = datetime(max_year,max_month,1)
    x = x.strftime("%b %y")
    max_crop = [x, round(max_value,2)]
    x = datetime(min_year, min_month, 1)
    x = x.strftime("%b %y")
    min_crop = [x, round(min_value,2)]

    return max_crop, min_crop, crop_price


def TwelveMonthPrevious(name):
    name = name.lower()
    current_month = datetime.now().month
    current_year = datetime.now().year
    current_rainfall = annual_rainfall[current_month - 1]
    commodity = crops_list[0]
    wpis = []
    crop_price = []
    for i in crops_list:
        x = i.getCropName()
        if name == x.lower():
            commodity = i
            break
    month_with_year = []
    for i in range(1, 13):
        if current_month - i >= 1:
            month_with_year.append((current_month - i, current_year, annual_rainfall[current_month - i - 1]))
        else:
            month_with_year.append((current_month - i + 12, current_year - 1, annual_rainfall[current_month - i + 11]))

    for m, y, r in month_with_year:
        current_predict = commodity.getPredictedValue([float(m), 2013, r])
        wpis.append(current_predict)

    for i in range(0, len(wpis)):
        m, y, r = month_with_year[i]
        x = datetime(y,m,1)
        x = x.strftime("%b %y")
        crop_price.append([x, round(((wpis[i])* base[name.capitalize()]) / 100, 2)])
    print("previous ", wpis)
    new_crop_price =[]
    for i in range(len(crop_price)-1,-1,-1):
        new_crop_price.append(crop_price[i])
    return new_crop_price


# ---------------------------- Api Endpoints -------------------------------

class PredictionApiEndPoint(APIView):

    serializer_class = DataSerializer

    def post(self, request):
        print('name')
        serializer = DataSerializer(data=request.data)
        if serializer.is_valid():
            print(serializer.data['name'])
            name = serializer.data['name']
            max_crop, min_crop, forecast_crop_values = TwelveMonthsForecast(name)
            prev_crop_values = TwelveMonthPrevious(name)
            forecast_x = [i[0] for i in forecast_crop_values]
            forecast_y = [i[1] for i in forecast_crop_values]
            previous_x = [i[0] for i in prev_crop_values]
            previous_y = [i[1] for i in prev_crop_values]
            current_price = CurrentMonth(name)
            # print(max_crop)
            # print(min_crop)
            # print(forecast_crop_values)
            # print(prev_crop_values)
            # print(str(forecast_x))
            crop_data = crops.crop(name)
            context = {
                "name": name,
                "max_crop": max_crop,
                "min_crop": min_crop,
                "forecast_values": forecast_crop_values,
                "forecast_x": forecast_x,
                "forecast_y": forecast_y,
                "previous_values": prev_crop_values,
                "previous_x": previous_x,
                "previous_y": previous_y,
                "current_price": current_price,
                "image_url": crop_data[0],
                "prime_loc": crop_data[1],
                "type_c": crop_data[2],
                "export": crop_data[3]
            }
            print('bY crops name')
            print(context['image_url'])
            return Response(context)


class WinnersLoosersApiEndPoint(APIView):

    def get(self, request):
        print('yahoo!!!')
        context = {
            'top5': TopFiveWinners(),
            'bottom5': TopFiveLosers(),
            'sixmonths': SixMonthsForecast()
        }
        print(context)
        return Response(context)
        



