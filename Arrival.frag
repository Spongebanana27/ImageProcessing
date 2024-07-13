#define pi 3.14159

precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

// GLOW & SDF FROM https://www.shadertoy.com/view/ldKyW1

float glow(float x, float str, float dist){
    return dist / pow(x, str);
}

// Sinus Signed Distance Function (distance field)
float sinSDF(vec2 st, float A, float offset, float freq, float phi){
    return abs((st.y - offset) + sin(st.x * freq + phi) * A);
}

void main(  )
{

    float speed = .4;

    vec3 color = vec3(1.000,1.000,1.000);

    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    float time = u_time/2.0;

    float glowStrength = .6;
    float glowDistance = .02;
    const float numWaves = 4.0;

    float col = 0.0;

    for(float i = 0.0; i< numWaves ; i++){
    
        float phase = (u_time * speed + i * 2.0 * pi / numWaves) * abs(.5 - uv.x)/(.5 - uv.x); // Equally spaced waves moving out from middle
        float frequency = 5.0;
        float amplitude = .15 * abs(uv.x - .5) * (1.0 + i); // Middle = 0, increase outward
        float offset = .5;
        
        col += glow(sinSDF(uv, amplitude, offset, frequency, phase), glowStrength, glowDistance);
    }
    
    //col = clamp(abs(.5 - uv.x)/(.5 - uv.x), 0.0, 1.0) + (col * -abs(.5 - uv.x)/(.5 - uv.x));
    
    col = 1.0-col;

    // Output to screen
    gl_FragColor = vec4(vec3(col) * color,1.0);
}