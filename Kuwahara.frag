precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_tex0; // data/Buddy.jpeg
uniform vec2 u_tex0Resolution;


void main()
{
    vec3 col = texture2D(u_tex0,gl_FragCoord.xy/u_resolution).rgb;

    int radius = 4;
    
    vec2 srcSize = vec2 (1.0 / u_resolution.x, 1.0 / u_resolution.y);
    
    vec2 uv = gl_FragCoord.xy.xy/u_resolution;
    
    float n = float((radius + 1) * (radius + 1));
    int i; 
	int j;
    
    // Quadrant ave
    vec3 a0 = vec3(0.0); vec3 a1 = vec3(0.0); vec3 a2 = vec3(0.0); vec3 a3 = vec3(0.0);
    
    // Quadrant sigma
    vec3 s0 = vec3(0.0); vec3 s1 = vec3(0.0); vec3 s2 = vec3(0.0); vec3 s3 = vec3(0.0);
    
    // Current
    vec3 c;
    
    // Quadrant 0
    for (int j = 0; j <= 10; j++)  {
         for (int i = 0; i <= 10; i++)  {
            if(i <= radius && j <= radius){
                c = texture2D(u_tex0, uv + (vec2(i ,j) * srcSize)).rgb;
                a0 += c;
                s0 += c * c;
                c = texture2D(u_tex0, uv + (vec2(i ,-1 * j) * srcSize)).rgb;
                a1 += c;
                s1 += c * c;
                c = texture2D(u_tex0, uv + (vec2(-1 * i ,j) * srcSize)).rgb;
                a2 += c;
                s2 += c * c;
                c = texture2D(u_tex0, uv + (vec2(-1 * i , -1 * j) * srcSize)).rgb;
                a3 += c;
                s3 += c * c;
            }
         }
    }

    // Quadrant 0 stdev
    a0 /= n;
    s0 = abs(s0 / n - a0 * a0);
    float sSum = s0.r + s0.g + s0.b;
    float lowestSig = sSum;
    col = a0;
    
    // Quadrant 1 stdev
    a1 /= n;
    s1 = abs(s1 / n - a1 * a1);
    sSum = s1.r + s1.g + s1.b;
    if(sSum < lowestSig){
        col = a1;
        lowestSig = sSum;
    }
    
    // Quadrant 2 stdev
    a2 /= n;
    s2 = abs(s2 / n - a2 * a2);
    sSum = s2.r + s2.g + s2.b;
    if(sSum < lowestSig){
        col = a2;
        lowestSig = sSum;
    }
    
    // Quadrant 3 stdev
    a3 /= n;
    s3 = abs(s3 / n - a3 * a3);
    sSum = s3.r + s3.g + s3.b;
    if(sSum < lowestSig){
        col = a3;
        lowestSig = sSum;
    }
    
    // Output to screen
    gl_FragColor = vec4(col,1.0);
}