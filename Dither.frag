precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_tex0; // data/IMG_5515.jpg
uniform vec2 u_tex0Resolution;

const mat4 thresholdMap = (mat4(0., .5, .125, .625, 
                                .75, .25, .875, .375,
                                .1875,.6875,.0625,.5625,
                                .9375,.4375,.8125, .3125));

// Looks better when firstColor is light
const vec3 firstColor = vec3(0.804,0.788,0.596);
const vec3 secondColor = vec3(0.220,0.220,0.220);


vec3 closest(vec3 col, float v)
{
    float t = (col.r + col.g + col.b) / (3.0);
    
    if(v < t){
        return firstColor;
    }
    return secondColor;   
   
}

void main()
{
    // Keep at 4 or break
    float ditherSize = 4.0;
    // Typically -1.0 to 1.0
    float brightness = 0.0;

    vec3 c = texture2D(u_tex0,gl_FragCoord.xy/u_resolution).rgb;
    
    int x = int(mod(gl_FragCoord.x, ditherSize));
    int y = int(mod(gl_FragCoord.y, ditherSize));
    
    // Get nearest palette color using threshold map to apply pattern
    vec3 t;
    if(x == 0){
        if(y == 0){
            t = closest(c + thresholdMap[0][0] - .5 + brightness, .5);
        }else if(y == 1){
            t = closest(c + thresholdMap[0][1] - .5 + brightness, .5);
        }else if(y == 2){
            t = closest(c + thresholdMap[0][2] - .5 + brightness, .5);
        }else{
            t = closest(c + thresholdMap[0][3] - .5 + brightness, .5);          
        }
    }else if(x == 1){
        if(y == 0){
            t = closest(c + thresholdMap[1][0] - .5 + brightness, .5);
        }else if(y == 1){
            t = closest(c + thresholdMap[1][1] - .5 + brightness, .5);
        }else if(y == 2){
            t = closest(c + thresholdMap[1][2] - .5 + brightness, .5);
        }else{
            t = closest(c + thresholdMap[1][3] - .5 + brightness, .5);            
        }
    }else if(x == 2){
        if(y == 0){
            t = closest(c + thresholdMap[2][0] - .5 + brightness, .5);
        }else if(y == 1){
            t = closest(c + thresholdMap[2][1] - .5 + brightness, .5);
        }else if(y == 2){
            t = closest(c + thresholdMap[2][2] - .5 + brightness, .5);
        }else{
             t = closest(c + thresholdMap[2][3] - .5 + brightness, .5);           
        }
    }else{
        if(y == 0){
            t = closest(c + thresholdMap[3][0] - .5 + brightness, .5);
        }else if(y == 1){
            t = closest(c + thresholdMap[3][1] - .5 + brightness, .5);
        }else if(y == 2){
            t = closest(c + thresholdMap[3][2] - .5 + brightness, .5);
        }else{
            t = closest(c + thresholdMap[3][3] - .5 + brightness, .5);            
        }
    }

    c = t;
    
    gl_FragColor = vec4(c,1.0);
    
}