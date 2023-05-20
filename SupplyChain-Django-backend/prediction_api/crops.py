def crop(crop_name):
    crop_data = {
    "wheat":["https://cdn.britannica.com/90/94190-050-C0BA6A58/Cereal-crops-wheat-reproduction.jpg", "U.P., Punjab, Haryana, Rajasthan, M.P., bihar", "rabi","Sri Lanka, United Arab Emirates, Taiwan"],
    "paddy":["https://m.economictimes.com/thumb/msid-93695073,width-1200,height-900,resizemode-4,imgsize-98586/paddy.jpg", "W.B., U.P., Andhra Pradesh, Punjab, T.N.", "kharif","Bangladesh, Saudi Arabia, Iran"],
    "barley":["https://www.farmingindia.in/wp-content/uploads/2019/05/barley-crop.jpg", "Rajasthan, Uttar Pradesh, Madhya Pradesh, Haryana, Punjab", "rabi","Oman, UK, Qatar, USA"],
    "maize":["https://bakhabarkissan.com/wp-content/uploads/2019/06/Shahzaibmaize.jpg", "Karnataka, Andhra Pradesh, Tamil Nadu, Rajasthan, Maharashtra", "kharif", "Hong Kong, United Arab Emirates, France"],
    "bajra":["https://cdn.pixabay.com/photo/2013/11/01/18/13/pearl-millet-204091__340.jpg", "Rajasthan, Maharashtra, Haryana, Uttar Pradesh and Gujarat", "kharif", "Oman, Saudi Arabia, Israel, Japan"],
    "copra":["https://img.etimg.com/thumb/width-1200,height-900,imgsize-111022,resizemode-1,msid-88436155/news/economy/policy/govt-hikes-msp-of-milling-copra-by-rs-255/quintal-ball-copra-by-rs-400-per-quintal.jpg", "Kerala, Tamil Nadu, Karnataka, Andhra Pradesh, Orissa, West Bengal","rabi", "Veitnam, Bangladesh, Iran, Malaysia"],
    "cotton":["https://static.fibre2fashion.com/newsresource/images/270/shutterstock-281842232_281960.jpg", "Punjab, Haryana, Maharashtra, Tamil Nadu, Madhya Pradesh, Gujarat","rabi", " China, Bangladesh, Egypt"],
    "masoor":["https://siamgroceries.com/wp-content/uploads/2021/11/masoor-dal.jpg", "Uttar Pradesh, Madhya Pradesh, Bihar, West Bengal, Rajasthan", "rabi", "Pakistan, Cyprus,United Arab Emirates"],
    "gram":["https://www.apnikheti.com/upload/crops/9001idea99green_gram_crop_banner.jpg", "Madhya Pradesh, Maharashtra, Rajasthan, Uttar Pradesh, Andhra Pradesh & Karnataka", "rabi", "Veitnam, Spain, Myanmar"],
    "groundnut":["http://www.agrilearner.com/wp-content/uploads/2018/06/11groundnut.jpg", "Andhra Pradesh, Gujarat, Tamil Nadu, Karnataka, and Maharashtra", "kharif", "Indonesia, Jordan, Iraq"],
    "arhar":["https://m.media-amazon.com/images/I/81wA2jVJPcL._SL1500_.jpg", "Maharashtra, Karnataka, Madhya Pradesh and Andhra Pradesh", "kharif", "United Arab Emirates, USA, Chicago"],
    "sesamum":["https://uranorganic.com/wp-content/uploads/2020/08/Sesame-seeds.jpg", "Maharashtra, Rajasthan, West Bengal, Andhra Pradesh, Gujarat", "rabi", "Iraq, South Africa, USA, Netherlands"],
    "jowar":["https://images.herzindagi.info/image/2021/Jan/Jowar-Can-Help-You-To-Maintain-Your-Health_g.jpg", "Maharashtra, Karnataka, Andhra Pradesh, Madhya Pradesh, Gujarat", "kharif", "Torronto, Sydney, New York"],
    "moong":["https://4.imimg.com/data4/QX/AD/MY-11117456/sabut-moong-500x500.jpg", "Rajasthan, Maharashtra, Andhra Pradesh", "rabi", "Qatar, United States, Canada"],
    "niger":["https://www.jrpimpex.com/wp-content/uploads/2022/06/Untitled-design-2.png", "Andha Pradesh, Assam, Chattisgarh, Gujarat, Jharkhand", "kharif", "United States of American,Argenyina, Belgium"],
    "rape":["https://static8.depositphotos.com/1490350/961/i/950/depositphotos_9617631-stock-photo-checking-the-rapeseed.jpg", "Rajasthan, Uttar Pradesh, Haryana, Madhya Pradesh, and Gujarat", "rabi", "Veitnam, Malaysia, Taiwan"],
    "jute":["https://images.jdmagicbox.com/rep/b2b/seed-bag/seed-bag-7.jpg", " West Bengal , Assam , Orissa , Bihar , Uttar Pradesh", "kharif", "JOrdan, United Arab Emirates, Taiwan"],
    "safflower":["https://static.wixstatic.com/media/2a83c3_4bbedd564afe4da294b085c324edcc74~mv2.jpg/v1/fill/w_640,h_320,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/2a83c3_4bbedd564afe4da294b085c324edcc74~mv2.jpg",  "Maharashtra, Karnataka, Andhra Pradesh, Madhya Pradesh, Orissa", "kharif", " Philippines, Taiwan, Portugal"],
    "soyabean":["https://image.shutterstock.com/shutterstock/photos/1467898517/display_1500/stock-photo-soy-bean-mature-seeds-with-immature-soybeans-in-the-pod-soy-bean-close-up-open-green-soybean-1467898517.jpg",  "Madhya Pradesh, Maharashtra, Rajasthan, Madhya Pradesh and Maharashtra", "kharif", "Spain, Thailand, Singapore"],
    "urad":["https://www.gomothers.in/wp-content/uploads/2020/06/green-urad.jpg",  "Andhra Pradesh, Maharashtra, Madhya Pradesh, Tamil Nadu", "rabi", "United States, Canada, United Arab Emirates"],
    "ragi":["https://artimg.gympik.com/articles/wp-content/uploads/2018/03/Ragi-Finger-Millets.jpg",  "Maharashtra, Tamil Nadu and Uttarakhand", "kharif", "United Arab Emirates, New Zealand, Bahrain"],
    "sunflower":["https://www.healthifyme.com/blog/wp-content/uploads/2021/11/Sunflower-Seeds-for-Overall-Well-Being.jpg",  "Karnataka, Andhra Pradesh, Maharashtra, Bihar, Orissa", "rabi", "Phillippines, United States, Bangladesh"],
    "sugarcane":["https://plantix.net/en/library/assets/custom/crop-images/sugarcane.jpeg","Uttar Pradesh, Maharashtra, Tamil Nadu, Karnataka, Andhra Pradesh" , "kharif", "Kenya, United Arab Emirates, United Kingdom"]
    }
    return crop_data[crop_name]