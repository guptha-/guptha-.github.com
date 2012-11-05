public class Return_object {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub

		Getter_returnObject t = new Getter_returnObject();

		//System.out.println("Result should be Hello");
		System.out.println(t.returnObj());

	}

}

class Getter_returnObject {

	public String returnObj() {
		return "Hello";
	}
}
