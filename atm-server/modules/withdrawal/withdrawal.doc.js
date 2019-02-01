/**
 * @api {post} /withdrawal/to-withdrawal/
 * @apiName To Withdrawal
 * @apiGroup Withdrawal
 * @apiDescription This api is responsible to withdrawal
 * @apiVersion 1.0.0
 * @apiParam {number} value value to withdrawal
 * @apiParamExample {json} Exemplo de Envio
 * {
 *     value: 250
 * }
 * @apiSuccessExample {json} Sucesso
 * {
 *     successfully: true,
 *     Response: {
 *         _id: 'ObjectId',
 *         MoneyNotes: [
 *             {
 *                 value: 100,
 *                 quantity: 2
 *             },
 *             {
 *                 value: 50,
 *                 quantity: 1
 *             }
 *         ],
 *         total: -250,
 *         isDeposit: false,
 *         datetime: '2019-02-01T12:00:00.000Z'
 *     }
 * }
 * @apiErrorExample {json} Error
 * {
 *     successfully: false,
 *     Response: 'WITHDRAWAL_TO_WITHDRAWAL_MESSAGE_ERROR'
 * }
 */