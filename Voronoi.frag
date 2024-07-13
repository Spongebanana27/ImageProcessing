#define PI 3.14159265
#define SIZE 8
#define GLOBALSPEED .2

precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

int indexMinDistance(vec2 uv, vec2[8] points){

    int index = 0;
    float minDist = 5000000.0;

    for(int i = 0; i < SIZE; i++){
        if(minDist > abs(pow((uv.x - points[i].x),2.0)) + abs(pow((uv.y - points[i].y),2.0))){
            index = i;
            minDist = abs(pow((uv.x - points[i].x),2.0)) + abs(pow((uv.y - points[i].y),2.0));
        }
    }
    return index;
}

vec2 animateCircle(vec2 center, float diameter, float speed, float tOffset){
    float x = ((sin((u_time + tOffset) * speed * GLOBALSPEED)) * .5 * diameter) + center.x;
    float y = ((cos((u_time + tOffset) * speed * GLOBALSPEED + PI)) * .5 * diameter) + center.x;
    return vec2(x,y);
}

void main()
{

    vec2 points[SIZE];
    vec3 colors[SIZE]; 
    colors = vec3[](vec3(1.000,0.678,0.678), vec3(1.000,0.804,0.702), vec3(0.992,0.961,0.749), vec3(0.780,1.000,0.678), vec3(0.600,1.000,0.847), vec3(0.659,0.851,1.000), vec3(0.682,0.659,1.000), vec3(0.839,0.678,1.000));


    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    
    points[0] = animateCircle(vec2(.26,.39), .80, .25, 0.5);
    points[1] = animateCircle(vec2(.51,.5), 1.0, 1.25, 0.4);
    points[2] = animateCircle(vec2(.5,.5), .5, 1.0, 0.2);
    points[3] = animateCircle(vec2(.41,.61), .75, 1.3, 1.7);
    points[4] = animateCircle(vec2(.69,.6), .550, .25, 5.);
    points[5] = animateCircle(vec2(.31,.5), .25, .75, 6.9);
    points[6] = animateCircle(vec2(.5,.6), .9, 1.1, 49.9);
    points[7] = animateCircle(vec2(.71,.65), .445, .6, -.8);

    // Time varying pixel color
    vec3 col = colors[indexMinDistance(uv, points)];
   
    // Output to screen
    fragColor = vec4(col,1.0);
}