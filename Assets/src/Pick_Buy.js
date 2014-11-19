static var WindowSwitch : boolean = false;
    var mySkin : GUISkin;
    var windowRect = Rect (200, 80, 240, 100);
    function OnGUI ()
    {
       if(WindowSwitch ==  true)
       {
       		if(this.tag!="buyed")
       		{
          		GUI.skin = mySkin;
            		windowRect = GUI.Window (0, windowRect, WindowContain, "price:500");
            }
      }

   }
   function WindowContain (windowID : int)
   {
       if (GUI.Button (Rect (50,40,50,30), "buy"))
      {
      	this.tag ="buyed";
        WindowSwitch = false;
       // this.gameObject.active = false;
        DontDestroyOnLoad(transform.gameObject);
      }
      if(GUI.Button (Rect (120,40,50,30), "close"))
      {
      	WindowSwitch = false;
      	
      }
   }
   function WindowContain1 (windowID : int)
   {
   }
function OnMouseEnter ()
   {
       GetComponent.<Renderer>().material.color = Color.red;
   }
   function OnMouseDown ()
   {	if(this.tag!="buyed")
   		{
      		WindowSwitch = true;
      	}
   }
   function OnMouseExit ()
   {
      GetComponent.<Renderer>().material.color = Color.white;
   }
 function stop()
 {
 	this.enabled = false;
 }
 function start()
 {
 this.enabled = true;
 }
 
function show()
{
	 this.gameObject.active = true;
}