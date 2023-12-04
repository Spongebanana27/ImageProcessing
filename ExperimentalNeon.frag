precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_tex0; // data/Untitled.png
uniform vec2 u_tex0Resolution;


void main()
{
    vec3 col = texture2D(u_tex0,gl_FragCoord.xy/u_resolution).rgb;

    vec2 srcSize = vec2 (1.0 / u_resolution.x, 1.0 / u_resolution.y);
    vec2 uv = gl_FragCoord.xy.xy/u_resolution;
    
    const float radius = 50.0;
    float glow = 100.0;
    float falloff = 0.0;
    float s = .08;

    vec3 c;
    int t = 0;
    vec3 sum = col;

    float lightThreshold = 1.0;
    for (float j = -radius; j <= radius; j++){
        for (float i = -(radius); i <= radius; i++)  {
            c = texture2D(u_tex0, uv + (vec2(i ,j) * srcSize)).rgb;
            float dist = pow(pow(i, 2.0) + pow(j,2.0), .5);
            if(dist < radius){
                c = texture2D(u_tex0, uv + (vec2(i ,j) * srcSize)).rgb;
                sum += c * glow * exp(-s * dist);
                t++;
            }
        }
    }

    if(col.r + col.g + col.b > lightThreshold){
        col = vec3(1.0);
    }
    else{
        col = sum / float(t);
    }
    
    // Output to screen
    gl_FragColor = vec4(col,1.0);
}