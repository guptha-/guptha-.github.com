public class instance_of {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Getter_of t = new Getter_of();
		String s = "";

		//System.out.println("Result should be true");
		System.out.println(t.instan(s));

	}

}

class Getter_of{
public boolean instan(Object o) {
        return o instanceof String;
    }
}
