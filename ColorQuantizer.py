import numpy as np
from PIL import Image

## 2 ^ n = num of colors
n = 4
filePath = "C:\Photos\\Sus.JPG"

im = Image.open(filePath, 'r') 

def quantize(imgBucket, bucket):

    rAverage = np.mean(bucket[:,0])
    gAverage = np.mean(bucket[:,1])
    bAverage = np.mean(bucket[:,2])
    
    for item in bucket:
        imgBucket[item[3]] = [rAverage, gAverage, bAverage, item[3]]


def medianCut(imgBucket, bucket, depth):
    if depth == 0:
        quantize(imgBucket, bucket)
        return

    ## Calculate highest range and sort
    rRange = np.max(bucket[:,0]) - np.min(bucket[:,0])
    gRange = np.max(bucket[:,1]) - np.min(bucket[:,1])
    bRange = np.max(bucket[:,2]) - np.min(bucket[:,2])
    
    largestRange = 0

    if gRange >= rRange and gRange >= bRange:
        largestRange = 1
    elif bRange >= rRange and bRange >= gRange:
        largestRange = 2
    elif rRange >= bRange and rRange >= gRange:
        largestRange = 0

    bucket = bucket[bucket[:,largestRange].argsort()]

    #split the array into two blocks
    med = int((len(bucket)+1)/2)
    medianCut(imgBucket, bucket[0:med], depth-1)
    medianCut(imgBucket, bucket[med:], depth-1)

    return bucket

pix = im.load()
w, h = im.size

bucket = []

## Fill buckets with pixels
c=0
for i in range(w):
    for j in range(h):
        bucket.append([pix[i, j][0], pix[i, j][1], pix[i, j][2], c])
        c += 1

bucket = np.array(bucket)
imgBucket = bucket

medianCut(imgBucket, bucket, n)

new = Image.new('RGB', (w, h))

c=0
for i in range(w):
    for j in range(h):
        new.putpixel((i, j), (int(imgBucket[c][0]), int(imgBucket[c][1]), int(imgBucket[c][2])))
        c += 1

new.save(filePath + "_Quantized_" + str(pow(2, n)) + ".jpeg") 
        