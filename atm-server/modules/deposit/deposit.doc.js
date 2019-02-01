/**
 * @api {post} /deposit/to-deposit/
 * @apiName To Deposit
 * @apiGroup Deposit
 * @apiDescription This api is responsible to deposit money notes
 * @apiVersion 1.0.0
 * @apiParam {Object[]} MoneyNotes List of the Money Notes with quantity and value
 * @apiParam {number} MoneyNote.value value of the money note
 * @apiParam {number} MoneyNote.quantity quantity of the money note
 * @apiParamExample {json} Exemplo de Envio
 * {
 *     MoneyNotes: [
 *         {
 *             value: 50,
 *             quantity: 4
 *         },
 *         {
 *             value: 100,
 *             quantity: 2
 *         }
 *     ]
 * }
 * @apiSuccessExample {json} Sucesso
 * {
 *     successfully: true,
 *     Response: {
 *         _id: 'ObjectId',
 *         MoneyNotes: [
 *             {
 *                 value: 50,
 *                 quantity: 4
 *             },
 *             {
 *                 value: 100,
 *                 quantity: 2
 *             }
 *         ],
 *         total: 400,
 *         isDeposit: true,
 *         datetime: '2019-02-01T12:00:00.000Z'
 *     }
 * }
 * @apiErrorExample {json} Erro
 * {
 *     successfully: false,
 *     Response: 'DEPOSIT_TO_DEPOSIT_MESSAGE_ERROR'
 * }
 */