
public class Rem_long_2addr {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
        long x, y, z;
        x = 10000000000l;
        y = 4000000000l;
        z = x % y;
        z+=1;
       // System.out.println("Result should be 2000000001");		
        System.out.println (z);

	}

}
