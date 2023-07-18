import numpy as np
from PIL import Image

## 2 ^ n = num of colors
n = 6
filePath = "data/NickAndJulia.jpeg"


im = Image.open(filePath, 'r') 

def quantize(imgBucket, bucket):

    r_average = np.mean(bucket[:,0])
    g_average = np.mean(bucket[:,1])
    b_average = np.mean(bucket[:,2])
    
    for item in bucket:
        imgBucket[item[3]] = [r_average, g_average, b_average, item[3]]


def medianCut(imgBucket, bucket, depth):
    if depth == 0:
        quantize(imgBucket, bucket)
        return

    ## Calculate highest range and sort
    rRange = np.max(bucket[:,0]) - np.min(bucket[:,0])
    gRange = np.max(bucket[:,1]) - np.min(bucket[:,1])
    bRange = np.max(bucket[:,2]) - np.min(bucket[:,2])
    
    space_with_highestRange = 0

    if gRange >= rRange and gRange >= bRange:
        space_with_highestRange = 1
    elif bRange >= rRange and bRange >= gRange:
        space_with_highestRange = 2
    elif rRange >= bRange and rRange >= gRange:
        space_with_highestRange = 0

    bucket = bucket[bucket[:,space_with_highestRange].argsort()]

    median_index = int((len(bucket)+1)/2)

    #split the array into two blocks
    medianCut(imgBucket, bucket[0:median_index], depth-1)
    medianCut(imgBucket, bucket[median_index:], depth-1)



    return bucket

pix = im.load()
w, h = im.size

bucket = []

c=0

## Fill buckets with pixels
for i in range(w):
    for j in range(h):
        bucket.append([pix[i, j][0], pix[i, j][1], pix[i, j][2], c])
        c += 1

bucket = np.array(bucket)
imgBucket = bucket

medianCut(imgBucket, bucket, n)

new = Image.new('RGB', (w, h))

c = 0
for i in range(w):
    for j in range(h):
        new.putpixel((i, j), (int(imgBucket[c][0]), int(imgBucket[c][1]), int(imgBucket[c][2])))
        c += 1

new.save(filePath + "_Quantized_" + str(pow(2, n)) + ".jpeg") 
        