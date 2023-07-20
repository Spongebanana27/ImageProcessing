precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_tex0; // data/Buddy.jpeg
uniform vec2 u_tex0Resolution;

void main()
{

    float pixelSize = 10.0;

    vec3 col = texture2D(u_tex0, gl_FragCoord.xy/u_resolution).rgb;
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    vec2 srcSize = vec2 (1.0 / u_resolution.x, 1.0 / u_resolution.y);

    // Get pixel that gl_FragCoord is in
    vec2 pixels = floor(u_resolution / pixelSize);
    vec2 pixelCoord = gl_FragCoord.xy / pixelSize;
    
    // Location inside of pixel
    vec2 temp = pixelCoord - floor(pixelCoord);
    vec2 loc = (temp.xy * pixelSize + .5);
    
    vec3 avg = vec3(0.0);
    int count = 0;

    bool first = true;
    bool second = true;


    for(float j = 0.0; j < 10.0; j++){
        for(float i = 0.0; i < 10.0; i++){
            if(j < pixelSize - loc.x - 1.0 && i < pixelSize - loc.y - 1.0){
                avg += texture2D(u_tex0, uv + (vec2(j - loc.x, i - loc.y) * srcSize)).rgb;
                count++;
            }
        }
    }
    
    avg /= float(count);
    
    // Output to screen
    gl_FragColor = vec4(avg,1.0);
}