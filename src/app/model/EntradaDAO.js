import { consulta } from "../connections/connection.js";

class EntradaDAO {
  async create(entrada) {
    const sql = "INSERT INTO tbl_entradas SET ?;";
    try {
      const result = await consulta(
        sql,
        entrada,
        "Não foi possível cadastrar o novo Entrada"
      );
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async findById(id) {
    try {
      const sql = `
        SELECT 
            e.*,
            c.tipo_cliente, 
            c.nome_cliente, 
            c.email_cliente, 
            c.telefone_cliente, 
            c.cpf_cnpj,
            cc.numero_agencia, 
            cc.numero_conta
        FROM 
            tbl_entradas e
        JOIN 
            tbl_clientes c ON e.id_cliente = c.id_cliente
        JOIN 
            tbl_contas_caixa cc ON c.id_conta_caixa = cc.id_conta
        WHERE 
            e.id_entrada = ?;
    `;
      const result = await consulta(
        sql,
        [id],
        `Não conseguimos encontrar o Entrada de id: ${id}`
      );
      if (result.length === 0) {
        throw new Error("Id inválido");
      } else {
        return result[0];
      }
    } catch (error) {
      console.log(error);
    }
  }

  async findByIdComNomeFunc(id) {
    const sql = `SELECT 
    m.*, 
    f.id_funcionario, 
    f.nome_funcionario,
    e.nome_cliente
FROM 
    tbl_entradas m
JOIN 
    tbl_funcionarios f ON m.id_funcionario = f.id_funcionario
JOIN 
    tbl_cliente e ON m.id_cliente = e.id_cliente
WHERE 
    m.id_entrada = ?;

    `;

    const result = await consulta(
      sql,
      id,
      `Não conseguimos encontrar o Entrada de id: ${id}`
    );
    if (result.length === 0) {
      throw new Error("Id inválido");
    } else {
      return result[0];
    }
  }

  async receberEntrada(entrada) {
    const sql = "INSERT INTO tbl_recebimento_entrada SET ?;";
    try {
      const result = await consulta(
        sql,
        Entrada,
        "Não foi possível registar o recebimento do novo Entrada"
      );
    } catch (err) {
      console.log(err);
    }
  }

  async findAllEntradasByIdCliente(id) {
    const sql = `
      SELECT 
        m.*, 
        f.nome_funcionario 
      FROM 
        tbl_recebimento_ m
      JOIN 
        tbl_funcionarios f 
      ON 
        m.id_funcionario = f.id_funcionario 
      WHERE 
        m.id_cliente = ?;
    `;
    const result = await consulta(
      sql,
      id,
      `Não encontramos nenhum Entrada relcionado ao cliente de id: ${id}`
    );
    return result;
  }
}
export default new EntradaDAO();
