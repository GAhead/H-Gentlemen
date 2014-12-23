	static var WindowSwitch : boolean = false;
    var mySkin : GUISkin;
    var windowRect = Rect (200, 80, 240, 100);
    private var m_gm : GameObject;
	private var m_gms :GameManage;
	var buy : AudioClip = null;
	var nomoney : AudioClip = null;
	function Awake () {
		m_gm = GameObject.FindWithTag("GM");
		m_gms = m_gm.GetComponent("GameManage");
	}
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
      	if(m_gms.cost(500))
      	{	
      		
      		this.tag ="buyed";
        	WindowSwitch = false;
       		// this.gameObject.active = false;
        	DontDestroyOnLoad(transform.gameObject);
        	GetComponent.<AudioSource>().PlayOneShot(buy,0.8f);
        	
        }
        else{
        	GetComponent.<AudioSource>().PlayOneShot(nomoney,0.8f);
        }
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