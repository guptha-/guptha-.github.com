
public class Div_long_2addr {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
	
        long x, y, z;
        x = 100000000000l;
        y = 40000000000l;
        z = x/y;
        z+=1;
        //System.out.println("Div result should be 3l");		
        System.out.println (z);
        

	}

}
