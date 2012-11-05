
public class Rem_double_2addr {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
	
        double x, y, z;
        x =2.7d;
        y = 3.14d;
        z = x % y;
        z+=1 ;
        //System.out.println("Result should be 3.7");		
        System.out.println (z);

	}

}