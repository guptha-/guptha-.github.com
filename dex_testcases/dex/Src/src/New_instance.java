public class New_instance {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub

		Instan i = new Instan();
		String s = i.newinstan();

		//System.out.println("Result is 0");
		System.out.println(s.compareTo("abc"));

	}

}

class Instan {
	public String newinstan() {
		return new String("abc");
	}
}
