#pragma strict

function Start () {
	animation.Stop();  
}

function Update () {
    if (Mathf.Abs(Input.GetAxis("Vertical")) > 0.1)  
        animation.CrossFade("run");  
    else  
        animation.CrossFade("stand");  
}