precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_tex0; // data/Buddy.jpeg
uniform vec2 u_tex0Resolution;

void main()
{
    const vec3 firstColor = vec3(1.0);
    const vec3 secondColor = vec3(0.0);

    float areaScale = 1.0;

    float pixelSize = 6.0;

    float brightnessScale = .9;

    float maxCircleDiameter = pixelSize * 1.0;

    float minCircleDiameter = 2.0;

    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    vec2 srcSize = vec2 (1.0 / u_resolution.x, 1.0 / u_resolution.y);

    // Get pixel that gl_FragCoord is in
    vec2 pixelCoord = gl_FragCoord.xy / pixelSize;
    
    // Location inside of pixel
    vec2 temp = pixelCoord - floor(pixelCoord);
    vec2 loc = floor(temp.xy * pixelSize + .5);
    
    vec3 avg = vec3(0.0);
    int count = 0;

    for(float j = 0.0; j < 50.0; j++){
        for(float i = 0.0; i < 50.0; i++){
            if(j < (pixelSize * areaScale) -1.0 && i < (pixelSize * areaScale) - 1.0){
                avg += texture2D(u_tex0, uv + (vec2(j - loc.x, i - loc.y) * srcSize)).rgb;
                count++;
            }
        }
    }
    
    avg /= float(count);

    float brightness = (avg.r + avg.g + avg.b) * brightnessScale;

    float p = (brightness / 3.0);

    float d = maxCircleDiameter - minCircleDiameter;

    float circleRadius = (maxCircleDiameter - maxCircleDiameter * (brightness / 3.0)) / 2.0;

    float dist = distance(loc, temp + pixelSize / 2.0);

    if(dist > circleRadius && dist > (minCircleDiameter / 2.0)){
        avg = firstColor;
    }else{
        avg = secondColor;
    }

    // Output to screen
    gl_FragColor = vec4(avg,1.0);
}