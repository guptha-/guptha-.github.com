
public class int_to_double {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int2double t = new int2double();

		//System.out.println("Result should be 1.0");
		System.out.println(t.i2c(1));

	}

}

class int2double {

	public double i2c(int a) {
		return (double) a;
	}
}