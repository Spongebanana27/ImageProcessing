precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_tex0; // data/Buddy.jpeg
uniform vec2 u_tex0Resolution;

vec3 palette(float t){
    
    vec3 a = vec3(.5, .5, .5);
    vec3 b = vec3(.5, .5, .5);
    vec3 c = vec3(1., 1., 1.);
    vec3 d = vec3(.263, .416, .557);
    
    return a + b*cos(6.28318*(c*t+d));
}

void main()
{

    vec2 uv = gl_FragCoord.xy/u_resolution.xy * 2.0 - 1.0;
    vec2 uv0 = uv;
    vec3 finalColor = vec3(0.0);
  
    for(float i = 0.0; i < 3.0; i++){
    
        uv *= 1.5;
        
        uv = fract(uv);
        uv -= .5;
        
        float d = length(uv) * exp(-length(uv0));
        vec3 col = palette(length(uv0) + i * .4 + u_time*.4);
       
        //d = sin(d * 20. + u_time) / 20.;
        //d = abs(d);
        //d = pow(.01 / d, 1.2);
        
        d = abs(sin((d * 10.0)));
        d = pow(((.02* sin(u_time) + .05)) / d, .4);
        
        
        finalColor += col * d;
       
    }
  
    gl_FragColor = vec4(finalColor, 1.0);

}