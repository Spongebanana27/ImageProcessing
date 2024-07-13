#define pi 3.14159

precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

float CircleMask(vec2 uvP, float p, float color) {
    if(uvP.x < p){ 
        return 1.0 - (p - uvP.x) * 50.;
    } else{ 
        return color; 
    };
}

float glow(float x, float str, float dist){
    return dist / pow(x, str);
}

float circularSinSDF(vec2 st,  float amplitude, float offset, float freq, float phi, float radius){
    return abs(st.x - (radius + amplitude * (sin(st.y* freq + phi))));
}

void main(  )
{

    vec3 color = vec3(1.000,0.965,0.741);
   
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    uv = (uv - 0.5) * 2.0;
    uv.x *= u_resolution.x /u_resolution.y;
    
    float radius = .2;
    float glowStrength = .6;
    float glowDistance = .03;
    float speed = .25;
    
    const float numWaves = 6.0;
    
    float col = 0.0;
   
    vec2 uvP = vec2(sqrt(uv.x * uv.x + uv.y * uv.y), atan(uv.y/uv.x));
    
    col += glow(abs(uvP.x-radius), glowStrength, glowDistance);
    
    for(float i = 0.0; i< numWaves ; i++){
        col += glow(circularSinSDF(uvP, .03 + .04 * sin(u_time * speed * i) + cos(uvP.y), 0.0, 2.0, u_time * speed * (i + 1.0) / 2.0, radius), glowStrength, glowDistance);
    }
    
    col = CircleMask(uvP, radius, col);

    
    // Evil mode
    //col = 1.0-col;
    
    // Output to screen
    gl_FragColor = vec4(vec3(col) * color,1.0);
}