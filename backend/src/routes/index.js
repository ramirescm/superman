
import PessoaController from '../controllers/PessoaController'

export default (app) => {
    app.route('/api/v1/pessoa')
		.get(PessoaController.findAll)
		.post(PessoaController.insert);

	app.route('/api/v1/pessoa/:id')
		.get(PessoaController.findById)
		.delete(PessoaController.removeById)
        .put(PessoaController.update);
    
    app.route('/api/v1/pessoa/idade/:datanascimento/:dataatual').get(PessoaController.calcAge);
}
