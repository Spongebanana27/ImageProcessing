precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_tex0; // data/IMG_7305.jpg
uniform vec2 u_tex0Resolution;

void main()
{
    
    float sharpen = 0.8;
    
    float around = sharpen * -1.0;
    float center = sharpen * 4.0 + 1.0;
    
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    
    vec2 shift = 1.0 / u_resolution.xy;

    vec3 col = texture2D(u_tex0, uv).rgb * center + 
               texture2D(u_tex0, uv + vec2(shift.x, 0.0)).rgb * around + 
               texture2D(u_tex0, uv + vec2(0.0, shift.y)).rgb * around + 
               texture2D(u_tex0, uv + vec2(0.0, shift.y)).rgb * around + 
               texture2D(u_tex0, uv + vec2(-shift.x, 0.0)).rgb * around;

    // Output to screen
    gl_FragColor = vec4(col,1.0);
    
}