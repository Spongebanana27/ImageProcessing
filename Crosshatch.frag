precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_tex0; // data/Buddy.jpeg
uniform vec2 u_tex0Resolution;

void main()
{
    const float fdelta = 4.;
    const float fhalf = 3.;

    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
	float lum = length(texture2D(u_tex0, uv).rgb);
	
	gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
	
	if (lum < 1.00) {
		if (mod(gl_FragCoord.x + gl_FragCoord.y, fdelta) == 0.0) {
			gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
		}
	}
	
	if (lum < 0.75) {
		if (mod(gl_FragCoord.x - gl_FragCoord.y, fdelta) == 0.0) {
			gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
		}
	}
	
	if (lum < 0.50) {
		if (mod(gl_FragCoord.x + gl_FragCoord.y - fhalf, fdelta) == 0.0) {
			gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
		}
	}
	
	if (lum < 0.25) {
		if (mod(gl_FragCoord.x - gl_FragCoord.y - fhalf, fdelta) == 0.0) {
			gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
		}
	}
}