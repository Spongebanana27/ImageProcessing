import numpy as np
from PIL import Image

## 2 ^ n = num of colors
n = 1
filePath = "data/Buddy.jpeg_Quantized_2.jpeg"

thresholdMap = np.mat([[0., .5, .125, .625],
                       [.75, .25, .875, .375],
                    [.1875,.6875,.0625,.5625],
                    [.9375,.4375,.8125, .3125]])

def nearestColor(palette, rgb):
    lowest = 10000
    val = rgb
    for item in palette:
        diff = abs(palette[0] - rgb[0]) +abs(palette[1] - rgb[1]) +abs(palette[2] - rgb[2])
        if(diff < lowest):
            lowest = diff
            val = item

    return val


im = Image.open(filePath, 'r') 

pix = im.load()
w, h = im.size

bucket = []
palette = []

## Fill buckets with pixels
c=0
for i in range(w):
    for j in range(h):
        bucket.append([pix[i, j][0], pix[i, j][1], pix[i, j][2], i, j, c])
        c += 1

        if palette.count([[pix[i, j][0], pix[i, j][1], pix[i, j][2]]]) == 0:
            palette.append([pix[i, j][0], pix[i, j][1], pix[i, j][2]])
            print("Added" + str(palette))

bucket = np.array(bucket)

new = Image.new('RGB', (w, h))

c=0
r = 255 / n
for i in range(w):
    for j in range(h):

        bucket[c] = bucket[c] + r * thresholdMap[i % n, j % n] - 1/2

        newPixel = nearestColor(palette, [bucket[c][0], bucket[c][1], bucket[c][2]])

        new.putpixel((i, j), newPixel[0], newPixel[1], newPixel[2])
        c += 1
new.save(filePath + "_Quantized_Dithered_" + str(pow(2, n)) + ".jpeg") 
        